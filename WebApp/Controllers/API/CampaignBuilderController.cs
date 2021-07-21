﻿using CsvHelper;
using Dal.ViewModels;
using Google.Ads.GoogleAds.Config;
using Google.Ads.GoogleAds.Lib;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Services.Compaing;
using System.IO;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using WebApp.Helpers;
using WebApp.Pages.GoogleAds;
using WebApp.ViewModels;

namespace WebApp.Controllers.API
{

    public class CampaignBuilderController : Controller
  {
        private readonly ICompaingAplicationService compaingService;
        private readonly string UserId;
         private readonly IConfiguration configRoot;
    public WebLoginHelper loginHelper;
    private GoogleAdsClient client;

    public CampaignBuilderController(ICompaingAplicationService compaingService, IHttpContextAccessor httpContextAccessor, IConfiguration configRoot)
        {
            this.compaingService = compaingService;
            this.UserId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
      IConfigurationSection section = configRoot.GetSection("GoogleAdsApi");
      GoogleAdsConfig config = new GoogleAdsConfig(section);
      client = new GoogleAdsClient(config);
    }

        [HttpPost]
      [Route("api/[controller]/csv")]
    public FileResult Post([FromBody] CampaignViewModel campaign)
        {

            var csvModels = compaingService.GetCSVByIdAsync(campaign);
            var stream = new MemoryStream();
            using (var writeFile = new StreamWriter(stream, leaveOpen: true))
            {
                var csv = new CsvWriter(writeFile, System.Globalization.CultureInfo.CurrentCulture);
                csv.WriteRecords(csvModels);
            }
            stream.Position = 0; //reset stream
            return File(stream, "application/octet-stream", "ADCompaign.csv");
        }

    [HttpPost]
    [Route("api/[controller]/google")]
    public void SaveAndPostGoogleAsync([FromBody] CampaignViewModel campaign)
    {
      //var dbModel = await compaingService.AddAsync(campaign, UserId);
    }
  }
}
