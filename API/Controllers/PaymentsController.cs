using System.IO;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Stripe;
using Order = Core.Entities.OrderAggregate.Order;
namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly string _whSecret = "";
        private readonly IPaymentService _paymentS;
        private readonly IMapper _mapper;
        private readonly ILogger<IPaymentService> _logger;
        public PaymentsController(IPaymentService paymentS, IMapper mapper, ILogger<IPaymentService> logger,
         IConfiguration config)
        {
            _logger = logger;
            _mapper = mapper;
            _paymentS = paymentS;
            _whSecret = config.GetSection("StripeSettings:whsecret").Value;
        }

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            var basket = await _paymentS.CreateOrUpdatePaymentIntent(basketId);

            if (basket == null) return BadRequest(new ApiResponse(400, "Prblemas con la bolsa"));

            return basket;
        }


        [HttpPost("webHook")]
        public async Task<ActionResult> StripeWebHook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _whSecret);

            PaymentIntent intent;
            Order order;

            switch (stripeEvent.Type)
            {
                case "payment-intent.succeeded":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation("Payment Succeeded: " , intent.Id);
                    order = await _paymentS.UpdateOrderPaymentSucceded(intent.Id);
                    _logger.LogInformation("Order Update to paiment recived ", order.Id);
                    break;
                case "payment-intent.payment_failed":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation("Payment Failed: " , intent.Id);
                    order = await _paymentS.UpdateOrderPaymentFailed(intent.Id);
                    _logger.LogInformation("Payment Failed ", order.Id);
                break;
            }

            return new EmptyResult();
        }
    }
}