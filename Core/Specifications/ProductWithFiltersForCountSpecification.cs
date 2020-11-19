using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecification(ProductsSpecParams productsSpecParams) : base ( x => 
            (string.IsNullOrEmpty(productsSpecParams.Search) || x.Name.ToLower().Contains(productsSpecParams.Search)) &&
            (!productsSpecParams.BrandId.HasValue || x.ProductBrandId==productsSpecParams.BrandId) &&
            (!productsSpecParams.TypeId.HasValue || x.ProductTypeId == productsSpecParams.TypeId)
             
        )
        {
        }
    }
}