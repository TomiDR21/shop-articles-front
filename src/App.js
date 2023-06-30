import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/nav";
import Table from "./components/table";
import Form from "./components/form";
import axios from "axios";

function App() {
  const [listUpdated, setListUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});


  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value.toUpperCase(),
    });
    console.log(product);
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api?page=${currentPage}&limit=15`
      );
      setProducts(res.data);
      setTotalPages(Math.ceil(res.data.length / 15));
    } catch (error) {
      console.log(error);
    }
  };



  
  //PRODUCTS BY TAG
  const [data, setData] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const tags = [ "LA TIENDITA", "SERVILLETAS", "ARTE FIRBRO","BASTIDORES","STENCIL","BUENOS DESEOS", "TITINAS", "PINCELES", "SKALATEX"];
  const subTags = ["ETERNA", "EQARTE", "ALBA", "AQUARELL"];
  const carpinteriaSubTags = ["MADERA", "MDF"];
  const alCarpinteroSubTags = ["MADERA AC", "MDF AC"];
  const [tableTag, setTableTag] = useState('TODOS');





  const handleNavClick = (tag) => {
    console.log(`Selected tag: ${tag}`);
    setSelectedTag(tag);
    getProductByTag(tag);
    setTableTag(tag)
  };
  

  const getProductByTag = async (selectedTag) => {
    console.log("Selected tag (in getProductByTag): ", selectedTag);

    try {
      const response = await fetch(`http://localhost:5000/api/${selectedTag}`);
      const json = await response.json();
      setData(json);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
      if (selectedTag) {
        await getProductByTag();
      }
      setListUpdated(false);
    };

    fetchData();
  }, [currentPage, selectedTag, listUpdated]);


  const handleSubmit = (e) => {



    e.preventDefault();
    if (!product.article || !product.price) {
      alert('Please fill in all fields');
      return;
    }

    const matchedTags = tags.concat(subTags).filter(tag => tag.toUpperCase() === product.tag.toUpperCase());
  if (matchedTags.length === 0) {
    alert('Invalid tag');
    return;
  }

    axios.post('http://localhost:5000/api', product, {
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => getProducts())
        .catch(error => console.log(error));


}


  //RETURN-------------------------





  return (
    <Fragment>
      
      <Nav
      data={data}
        tags={tags}
        handleNavClick={handleNavClick}
        activeTag={selectedTag}
        subTags={subTags}
        carpinteriaSubTags={carpinteriaSubTags}
        alCarpinteroSubTags={alCarpinteroSubTags}
      ></Nav>

      <div className="app-container">
        <Table
        tableTag={tableTag} setTableTag={setTableTag}
        tags={tags}
          product={product}
          setProduct={setProduct}
          products={products}
          listUpdated={listUpdated}
          setListUpdated={setListUpdated}
          getProducts={getProducts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          handleChange={handleChange}
          selectedTag={selectedTag }
          setProducts={setProducts}
          handleSubmit={handleSubmit}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        ></Table>

        <Form
          getProducts={getProducts}
          handleChange={handleChange}
          product={product}
          handleSubmit={handleSubmit}
        ></Form>
      </div>
    </Fragment>
  );
}

export default App;
