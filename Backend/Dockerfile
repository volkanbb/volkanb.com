FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Backend/SaaS.API/SaaS.API.csproj", "Backend/SaaS.API/"]
COPY ["Backend/SaaS.Application/SaaS.Application.csproj", "Backend/SaaS.Application/"]
COPY ["Backend/SaaS.Domain/SaaS.Domain.csproj", "Backend/SaaS.Domain/"]
COPY ["Backend/SaaS.Infrastructure/SaaS.Infrastructure.csproj", "Backend/SaaS.Infrastructure/"]
RUN dotnet restore "Backend/SaaS.API/SaaS.API.csproj"
COPY . .
WORKDIR "/src/Backend/SaaS.API"
RUN dotnet build "SaaS.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SaaS.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SaaS.API.dll"]
