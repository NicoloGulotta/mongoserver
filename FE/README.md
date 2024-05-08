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
