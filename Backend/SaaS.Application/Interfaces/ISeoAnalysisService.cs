using System.Threading.Tasks;
using SaaS.Application.DTOs;

namespace SaaS.Application.Interfaces;

public interface ISeoAnalysisService
{
    Task<SeoAnalysisResultDto> AnalyzeUrlAsync(string url);
}
