using System;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string menssage = null)
        {
            StatusCode = statusCode;
            Menssage = menssage ?? GetDefaultMessageForStatusCode(statusCode);
        }


        public int StatusCode { get; set; }
        public string Menssage { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "A bad request, you hab made",
                401 => "Authorized, you are not",
                404 => "Resource found, it was not",
                500 => "Errors are the path to the dark side. Errors lead to anger. Anfer leads to hate. Hate leads to career change",
                _ => null
            };
        }

    }
}