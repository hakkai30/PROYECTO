using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PROYECTO_ANIME.Models;

namespace PROYECTO_ANIME.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }
    public IActionResult Index()
    {
        const string apiUrl = "https://dragonball-api.com/api/characters";

        var client = new HttpClient();
        var response = client.GetAsync(apiUrl).Result;
        var content = response.Content.ReadAsStringAsync().Result;


        var model = JsonConvert.DeserializeObject<Root>(content);
        return View(model);

    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}




    
