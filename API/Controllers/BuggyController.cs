using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
 
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _context;
        public BuggyController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest(){

            return NotFound( new ApiResponse(400));
        }

        [HttpGet("servererror")]
        public ActionResult GetServerError(){

            var cosa= _context.Products.Find(33).ToString();
            return Ok();
        }
        [HttpGet("badrequest")]
        public ActionResult GetBadRequest(){

            return BadRequest(new ApiResponse(400));
        }
        [HttpGet("badrequest/{id}")]
        public ActionResult GetBadRequest(int id){

            return Ok();
        }
    }
}