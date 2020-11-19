using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
    public interface ISpecification <T>
    {
        //Criterios de búsqueda
        Expression<Func<T, bool>> Criteria { get; }
        
        //Includes para entidades dependientes
        List<Expression<Func<T, object>>> Includes {get; }
        
        //Orden por defecto
        Expression<Func<T, object>> OrderBy {get; }
        
        //Orden descendente
        Expression<Func<T, object>> OrderByDescending {get; }
        
        //Coge "tantos" registros
        int Take {get;}
        
        //Desde..
        int Skip {get;}
        
        //Para ver si los parametros son de pagianción
        bool IsPagingEnable {get;}

         
    }
}