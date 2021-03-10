# BookClub

.Net Core 5, EF Core, Angular 11 material, PostgreSQL

EF Migrations

dotnet ef migrations add Initial -c DataContext --project ..\BookClub.Resource\

dotnet ef database update -c DataContext --project ..\BookClub.Resource\
