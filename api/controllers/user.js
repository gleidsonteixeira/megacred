function index()
{
  return "index";
}

function all()
{
  return "all";
}

function only(id)
{
  return "only: "+ id;
}

function store(data)
{
  return "user created: "+ JSON.stringify(data);
}

function update(data, id)
{
  return "user updated: "+ JSON.stringify(data);
}

function destroy(id)
{
  return "user deleted";
}

module.exports = {
  index,
  all,
  only,
  store,
  update,
  destroy
}