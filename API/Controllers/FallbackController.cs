using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;

public class FallbackController : Controller
{
    private readonly IWebHostEnvironment _environment;

    public FallbackController(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public ActionResult Index()
    {
        string webRootPath = _environment.WebRootPath;
        string filePath = Path.Combine(webRootPath, "index.html");

        return PhysicalFile(filePath, "text/HTML");
    }
}