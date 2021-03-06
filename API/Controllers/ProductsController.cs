using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Core.Specifications;
using AutoMapper;
using API.Dtos;
using API.Errors;
using Microsoft.AspNetCore.Http;
using API.Helpers;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProductsController(
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [Cached(600)]
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> Getproducts([FromQuery] ProductsSpecParams productsSpecParams)
        {
            //con filtos y ordenaciones
            var spec = new ProductsWithTypesAndBrandsSpecification(productsSpecParams);

            //para contar los prductos solo con filtros
            var countSpec = new ProductWithFiltersForCountSpecification(productsSpecParams);


            var ti = await _unitOfWork.Repository<Product>().CountAsync(countSpec);
            var totalItems = await _unitOfWork.Repository<Product>().CountAsync(countSpec);

            var productos = await _unitOfWork.Repository<Product>().ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<ProductToReturnDto>>(productos);

            return Ok(new Pagination<ProductToReturnDto> { Data = data, Count = totalItems, PageSize = productsSpecParams.PageSize, PageIndex = productsSpecParams.PageIndex });
        }
        [Cached(600)]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> Getproduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var p = await _unitOfWork.Repository<Product>().GetEntityWithSpec(spec);
            if (p == null)
            {
                return NotFound(new ApiResponse(404));
            }
            return Ok(_mapper.Map<ProductToReturnDto>(p));
        }
        [Cached(600)]
        [HttpGet("brands")]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _unitOfWork.Repository<ProductBrand>().ListAllAsync());
        }
        [Cached(600)]
        [HttpGet("types")]
        public async Task<ActionResult<List<ProductType>>> GetProductTypes()
        {
            return Ok(await _unitOfWork.Repository<ProductType>().ListAllAsync());
        }

    }
}