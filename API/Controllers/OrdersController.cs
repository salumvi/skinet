using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extension;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]

    public class OrdersController : BaseApiController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _mapper = mapper;
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<ActionResult<OrderToReturnDto>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var http = HttpContext;

            var address = _mapper.Map<AddressDto, Address>(orderDto.ShipToAddress);

            var order = await _orderService.CreateOrderAsync(email,orderDto.DeliveryMethodId, orderDto.BasketId, address);
            
            if(order == null) return BadRequest(new ApiResponse(400, "Se ha producido un error al crear la orden"));
            return  Ok(_mapper.Map<OrderToReturnDto>(order));

        }
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderToReturnDto>>> GetOrdersForUser(){
            
            var email = HttpContext.User.RetrieveEmailFromPrincipal();

            return Ok(_mapper.Map<IReadOnlyList<OrderToReturnDto>>(await _orderService.GetOrderForUserAsync(email)));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderUserById(int id){
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var order = await _orderService.GetOrderByIdAsyc(id, email);
            if(order == null) return BadRequest( new ApiResponse(404));
            return Ok(_mapper.Map<OrderToReturnDto>(order));
        }
        [HttpGet("deliverymethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods(){
            return Ok(await _orderService.GetDeliveryMethodsAsyc());
        }
    }
}