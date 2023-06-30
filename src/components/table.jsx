import React, { useState } from "react";
import styles from "./table.module.css";
import axios from "axios";

const Table = ({
  tableTag,
  setTableTag,
  tags,
  setProducts,
  selectedTag,
  handleChange,
  product,
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
  products,
  listUpdated,
  setListUpdated,
  getProducts,
  setSelectedProduct,
  selectedProduct,
  setProduct
}) => {
  const [percentage, setPercentage] = useState(0);
  const [showModalDlt, setShowModalDlt] = useState();
  const [showModalEdit, setShowModalEdit] = useState();
  const [clickedRowIndex, setClickedRowIndex] = useState(-1);
  const [showModalConfirm, setShowModalConfirm] = useState(false);


  const handlePercentageChange = (event) => {
    setPercentage(event.target.value);
  };

  const handleAddPercentage = () => {
    const filteredProducts = products.filter((product) => {return product.tag == selectedTag})
    const updatedProducts = filteredProducts.map((product) => ({
      ...product,
      price: Number(product.price) + (Number(product.price) * percentage) / 100,
    }));
    const truncatedProducts = updatedProducts.map((product) => ({
      ...product,
      price: Number(product.price.toFixed(0)),
    }));

    setProducts(truncatedProducts);
    setShowModalConfirm(false)
    axios
      .put("http://localhost:5000/api", updatedProducts)
      .then((response) => {
        console.log("Update successful");
      })
      .catch((error) => {
        console.log("Update failed");
      });
  };
  function handleConfirmPercentage() {
    // apply percentage change
    setPercentage(0);
    setShowModalConfirm(true);
  }
  
  function handleCancelPercentage() {
    setShowModalConfirm(false);
  }
  const productsPerPage = 15;

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const filteredProducts = products.filter(
    (product) => !selectedTag || product.tag === selectedTag
  );

  const totalProducts = filteredProducts.length;
  const totalOfPages = Math.ceil(totalProducts / productsPerPage);

  const productsForCurrentPage = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  //DELETE------

  const handleDelete = (id) => {
    const requestInit = {
      method: "DELETE",
    };

    fetch("http://localhost:5000/api/" + id, requestInit)
      .then((res) => {
        if (res.ok) {
          console.log("Delete successful");
          setListUpdated(true);
          setShowModalDlt(false);
        } else {
          console.log("Delete failed");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteClick = (index) => {
    // show the modal when the delete button is clicked
    setClickedRowIndex(index);
    setShowModalDlt(true);
  };

  const handleCancelDelete = () => {
    // hide the modal
    setShowModalDlt(false);
  };

  //UPDATE-------

  const handleUpdate = (id) => {
    const requestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    fetch("http://localhost:5000/api/" + id, requestInit)
      .then((response) => {
        if (response.ok) {
          console.log("Update successful");

          setListUpdated(true);
          setShowModalEdit(false);
        } else {
          console.log("Update failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const handleEditClick = (index) => {
    const selectedProduct = productsForCurrentPage[index];
    setClickedRowIndex(index);
    setShowModalEdit(true);
    setProduct(selectedProduct); // Add this line
  };


  const handleCancelEdit = () => {
    // hide the modal
    setShowModalEdit(false);
  };

  //TABLE----------

  return (
    <>
      <table className={styles.tabla}>
        <div className={styles.divTable}>{tableTag}</div>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Article</th>
            <th>
              Price

              <button
                className={styles.btnPercentage}
                onClick={handleConfirmPercentage}
              >
                + %
              </button>
              {showModalConfirm && (
                              <div className={styles.modalConfimContainer}><input
                              type="number"
                              value={percentage}
                              className={styles.percentageInput}
                              onChange={handlePercentageChange}
                            ></input>
      <div >
        <div className={styles.modal}>
          Add {percentage}%?
          <button onClick={handleAddPercentage}>Add</button>
          <button onClick={handleCancelPercentage}>Cancel</button>
        </div>
      </div>
      </div> )}
            </th>
            <th>Stock</th>
            <th></th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {productsForCurrentPage.map((product, index) => (
            <tr key={product.id}>
              {/* <td>{product.id}</td> */}
              <td>{product.article}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  disabled={showModalDlt}
                  onClick={() => handleEditClick(index)}
                  className={styles.btnEdit}
                >
                  <img src="/edit2.png" alt="" className={styles.btnEditImg} />
                </button>

                <button
                  disabled={showModalEdit}
                  onClick={() => handleDeleteClick(index)}
                  className={styles.btnDelete}
                >
                  <img
                    src="./delete.png"
                    alt=""
                    className={styles.btnDeleteImg}
                  />
                </button>
                {showModalDlt && clickedRowIndex === index && (
                  <div className={styles.modalDltContainer}>
                    <div className={styles.modalDlt}>
                      Delete?
                      <button
                        className={styles.btnYesDelete}
                        onClick={() => handleDelete(product.id)}
                      >
                        Yes
                      </button>
                      <button
                        className={styles.btnNoDelete}
                        onClick={handleCancelDelete}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
                {showModalEdit && clickedRowIndex === index && (
                  <div className={styles.modalDltContainer}>
                    <div className={styles.modalDlt}>
                      Edit?
                      <button className={styles.btnYesDelete} onClick={() => handleUpdate(product.id)}>
                        Yes
                      </button>
                      <button className={styles.btnNoDelete} onClick={handleCancelEdit}>No</button>
                    </div>
                  </div>
                )}
              </td>
              {/* <td><input type="checkbox"></input></td> */}
            </tr>
          ))}
        </tbody>

        {/* NAVIGATION BUTTONS */}

        <div className={styles.navigation}>
          <button
            onClick={() => handlePrevious()}
            className={styles.previousButton}
          >
            <img src="flecha-izquierda.png"></img>
          </button>
          {totalOfPages === 0 ? (
            <span className={styles.pageInfo}>Empty table</span>
          ) : (
            <span className={styles.pageInfo}>
              Page {currentPage} of {totalOfPages}
            </span>
          )}

          <button
            disabled={currentPage === totalOfPages}
            onClick={() => handleNext()}
            className={styles.nextButton}
          >
            <img src="flecha-correcta.png"></img>
          </button>
        </div>
      </table>
    </>
  );
};

export default Table;
