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

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IGenericRepository<ProductType> _producTypeRepo;
        private readonly IMapper _mapper;

        public ProductsController(
            IGenericRepository<Product> productRepo,
            IGenericRepository<ProductBrand> productBrandRepo,
            IGenericRepository<ProductType> producTypeRepo,
            IMapper mapper)
        {
            _productRepo = productRepo;
            _productBrandRepo = productBrandRepo;
            _producTypeRepo = producTypeRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Product>>> Getproducts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();

            var productos = await _productRepo.ListAsync(spec);
            return Ok(_mapper.Map<IReadOnlyList<ProductToReturnDto>>(productos) );
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> Getproduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var p = await _productRepo.GetEntityWithSpec(spec);
            if(p==null){
                return NotFound(new ApiResponse(404));
            }
            return Ok(_mapper.Map<ProductToReturnDto>(p));
        }

        [HttpGet("brands")]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrands(){
            return Ok(await _productBrandRepo.ListAllAsync());
        }

             [HttpGet("types")]
        public async Task<ActionResult<List<ProductType>>> GetProductTypes(){
            return Ok(await _producTypeRepo.ListAllAsync());
        }

    }
}