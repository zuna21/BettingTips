namespace API.Errors
{
    public class ApiException
    {
        public ApiException(int statusCode, string details, string message)
        {
            this.StatusCode = statusCode;
            this.Message = message;
            this.Details = details;
        }   

        public int StatusCode { get; set; }     
        public string Details { get; set; }
        public string Message { get; set; }
    }
}