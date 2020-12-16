using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.Extensions.Configuration;
using Stripe;
using Product = Core.Entities.Product;
using Order = Core.Entities.OrderAggregate.Order;

namespace Infrastructure.Services
{
    public class PaymentServices : IPaymentService
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _config;
        public PaymentServices(IBasketRepository basketRepository, IUnitOfWork unitOfWork, IConfiguration config)
        {
            _config = config;
            _unitOfWork = unitOfWork;
            _basketRepository = basketRepository;
        }

        public async Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var basket = await _basketRepository.GetBasketAsynyc(basketId);

            if(basket == null ) return null;


            var shippingPrice = 0m;

            if(basket.DeliveryMethodId.HasValue){
                var deliveryMethod =await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync((int) basket.DeliveryMethodId);
                shippingPrice = deliveryMethod.Price;
            }

            foreach (var item in basket.Items)
            {
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                if(item.Price != productItem.Price){
                    item.Price = productItem.Price;
                }
            }

            var service = new PaymentIntentService();
            PaymentIntent intent;
            var amount =(long) basket.Items.Sum( p => p.Quantity * p.Price * 100 ) + (long) shippingPrice * 100;
            if(string.IsNullOrEmpty(basket.PaymentIntentId)){
                var options = new PaymentIntentCreateOptions {
                    Amount= amount,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string>{"card"}
                };
                intent = await service.CreateAsync(options);
                basket.PaymentIntentId = intent.Id;
                basket.ClientSecret = intent.ClientSecret;
            } else {
                var options = new PaymentIntentUpdateOptions{
                    Amount = amount
                };
                await service.UpdateAsync(basket.PaymentIntentId, options);
            }

                await _basketRepository.UpdateBasketAsync(basket);

                return basket;

        }

        public async Task<Order> UpdateOrderPaymentFailed(string paymentIntentId)
        {
            var spec = new OrderByPaymentIdSpecification(paymentIntentId);

            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            order.Status=OrderStatus.PaymentFailed;

            _unitOfWork.Repository<Order>().Update(order);

            await _unitOfWork.Complete();
            return order;

        }

        public async Task<Order> UpdateOrderPaymentSucceded(string paymentIntentId)
        {
            var spec = new OrderByPaymentIdSpecification(paymentIntentId);

            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
            if(order == null) return null;

            order.Status=OrderStatus.PaymentRecevied;

            _unitOfWork.Repository<Order>().Update(order);

            await _unitOfWork.Complete();
            return order;

        }
    }
}