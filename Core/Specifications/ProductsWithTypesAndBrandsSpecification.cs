using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductsSpecParams productsSpecParams) : base
        ( x => 
            (string.IsNullOrEmpty(productsSpecParams.Search) || x.Name.ToLower().Contains(productsSpecParams.Search)) &&
            (!productsSpecParams.BrandId.HasValue || x.ProductBrandId==productsSpecParams.BrandId) &&
            (!productsSpecParams.TypeId.HasValue || x.ProductTypeId == productsSpecParams.TypeId)
             
        )
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProducBrand);
            AddOrderBy(x => x.Name);
            ApplyPaging(productsSpecParams.PageSize * (productsSpecParams.PageIndex -1), productsSpecParams.PageSize);

            switch (productsSpecParams.Sort)
            {
                case "priceAsc":
                    AddOrderBy(x => x.Price);
                    break;
                case "priceDesc":
                    AddOrderByDescending(x => x.Price);
                    break;
                case "nameDesc":
                    AddOrderByDescending(x => x.Name);
                    break;
                default:
                    AddOrderBy(n => n.Name);
                    break;
            }

        }

        public ProductsWithTypesAndBrandsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProducBrand);

        }


    }
}