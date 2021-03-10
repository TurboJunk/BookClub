Migration commands

dotnet ef migrations add Initial -c DataContext --project ..\BookClub.Resource\

dotnet ef database update -c DataContext --project ..\BookClub.Resource\