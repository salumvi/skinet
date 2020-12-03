using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IMapper _mapper;
        public BasketController(IBasketRepository basketRepository, IMapper mapper)
        {
            _mapper = mapper;
            _basketRepository = basketRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetBasketById(string id)
        {
            var basket = (await this._basketRepository.GetBasketAsynyc(id));
            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basketDto)
        {
            var updateBasket = await _basketRepository.UpdateBasketAsync(_mapper.Map<CustomerBasket>(basketDto));
            return Ok(updateBasket);
        }

        [HttpDelete]
        public async Task DeleteBasketAsynk(string id)
        {
            await _basketRepository.DeleteBasketAsync(id);
        }

    }
}