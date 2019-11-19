const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const router = require("koa-router")();
const query = require("./ser/index");

app.use(bodyParser());
app.use(router.routes());

//获取全部数据
router.get("/api/list", async ctx => {
  const data = await query("select * from login");
  ctx.body = {
    code: 0,
    data: data
  };
});


//增加数据
router.post("/api/add", async ctx => {
  const { username, phone, edit, address } = ctx.request.body;
  const data = await query(
    "insert into login (username,phone,edit,address) values (?,?,?,?) ",
    [username, phone, edit, address]
  );
  if (data) {
    ctx.body = {
      code: 0,
      msg: "添加成功"
    };
  } else {
    ctx.body = {
      code: 1,
      msg:"添加失败"
    };
  }
});

//删除数据
router.get("/api/delete", async ctx => {
  const { id } = ctx.query;
  const data = await query("delete from login where id=?", [id]);
  if (data) {
    ctx.body = {
      code: 0,
      msg: "删除成功"
    };
  } else {
    ctx.body = {
      code: 1,
      msg:"删除失败"
    };
  }
});

//改变数据
router.post("/api/edit", async ctx => {
  const { username, password, id } = ctx.request.body;
  console.log(username)
  const data = await query(
    "update login set username=?,password=? where id=?",
    [username, password, id]
  );
  if (data) {
    ctx.body = {
      code: 0,
      msg: "修改成功"
    };
  } else {
    ctx.body = {
      code: 1,
      msg:"修改失败"
    };
  }
});

//搜索
// router.get("/api/sousuo", async ctx => {
//   const { username } = ctx.query;
//   const data = await query(
//     // `select * FROM login WHERE username LIKE '%${username}%'`
//     "select * from login where username=?",[username]
//   );
//   if (data) {
//     ctx.body = {
//       code: 0,
//       data
//     };
//   } else {
//     ctx.body = {
//       code: 1,
//       msg:"查找失败"
//     };
//   }
// });

//查找某条数据
router.get("/api/listfn", async ctx => {
  const { id } = ctx.query;
  const data = await query("select * from login where id=?", [id]);
  if (data) {
    ctx.body = {
      code: 1,
      data
    };
  }

  app.use(ctx => {
    ctx.body = {
      code: 0,
      msg: "获取成功"
    };
  });
});



app.listen(7001, () => {
  console.log("链接成功");
});
