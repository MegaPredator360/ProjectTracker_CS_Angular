using ProjectTracker.IOC;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Llamamos al metodo para realizar la conexion a la base de datos
builder.Services.InjectarDependecias(builder.Configuration);

// Esto permitira compartir imformacion con cualquier Url
builder.Services.AddCors(options =>
{
    options.AddPolicy("NuevaPolitica", app =>
    {
        app.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Se invoca al Cors creado
app.UseCors("NuevaPolitica");

app.UseAuthorization();

app.MapControllers();

app.Run();
