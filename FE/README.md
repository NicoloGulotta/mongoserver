Gulotta Nicolò
2024
EPICODE
useEffect(() => {
const { id } = params;
const blog = Data.find(Data => Data.\_id.toString() === id);

    if (blog) {
      setBlog(blog);
      setLoading(false);
    } else {
      navigate("/404");
    }

}, []);

routeAuthor.post("/registration", async (req, res, next) => {
try {
// const { name, email, password, lastName, avatar, birthday } = req.body;
let author = await Author.create({
...req.body,
password: await bcrypt.hash(req.body.password, 10)
})
// const author = await Author.create({
// name,
// lastName,
// email,
// password: hashedPassword,
// birthday,
// avatar
// });
const token = generateJWT({
\_id: author.\_id,
})
res.send(author, token);

    } catch (error) {
        next(error)
        console.error(error.message);
        res.status(400).send({ error: error.message || 'Registration failed' });
    }

});

export default routeAuthor;
