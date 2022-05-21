using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NSS_Overflow.Data;
using NSS_Overflow.GraphQL;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var firebaseCredPath = builder.Configuration["FirebaseCredPath"];
var dbConnectionString = builder.Configuration["DefaultConnection"];

builder.Services.AddPooledDbContextFactory<AppDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddGraphQLServer().AddQueryType<Query>().AddProjections().AddFiltering();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                      });
});

FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile(firebaseCredPath),
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.IncludeErrorDetails = true;
    options.Authority = "https://securetoken.google.com/nssoverflow";
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = "https://securetoken.google.com/nssoverflow",
        ValidateAudience = true,
        ValidAudience = "nssoverflow",
        ValidateLifetime = true,
    };
});


var app = builder.Build();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapGraphQL();
});

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();

//app.UseAuthorization();

app.Run();