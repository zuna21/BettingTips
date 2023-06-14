using Microsoft.AspNetCore.Mvc;

public class FallbackController : Controller
{

    public ActionResult Index()
    {
        string webRootPath = "/var/www/bettingmasteradvice/wwwroot";
        string filePath = Path.Combine(webRootPath, "index.html");

        return PhysicalFile(filePath, "text/HTML");
    }
}