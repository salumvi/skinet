using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IUnitOfWork _unitOfWork;
        public OrderService(IBasketRepository basketRepository, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _basketRepository = basketRepository;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            // get basket form repoBasket
            var basket = await _basketRepository.GetBasketAsynyc(basketId);
            // get items form the producRepo
            var orderItems = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var producItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                var itemOrder = new ProductItemOrdered(producItem.Id, producItem.Name, producItem.PictureUrl);
                var orderItem = new OrderItem(itemOrder, item.Price, item.Quantity);
                orderItems.Add(orderItem);
            }

            // get delivery method form repo
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);
            // calc subtotal
            // create order
            var order = new Order(orderItems, buyerEmail, shippingAddress, deliveryMethod);
            _unitOfWork.Repository<Order>().Add(order);

            // save to bd
            // await _orderRepository.
            var result = await _unitOfWork.Complete();

            // si sale mal
            if(result <=0) return null;
            // si todo sale bien:
            // delete basket
            await _basketRepository.DeleteBasketAsync(basketId);
            // return the order 
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsyc()
        {
           return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync(); 
        }

        public async Task<Order> GetOrderByIdAsyc(int id, string buyerEmail)
        {
            var spec = new OrderWhitTypesAndOrderSpecification(id , buyerEmail);

            return  await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrderForUserAsync(string buyerEmail)
        {
            var spec = new OrderWhitTypesAndOrderSpecification(buyerEmail);

            return  await _unitOfWork.Repository<Order>().ListAsync(spec);

        }
    }
}