import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";

import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enterAmount, setEnterAmount] = useState(null);
  const navigate = useNavigate();

  const addProduct = async e => {
    e.preventDefault();
    setLoading(true);

    // ====== add product to the firebase database =========
    try {
      const docRef = await collection(db, "products");

      const storageRef = ref(
        storage,
        `productImages/${Date.now() + enterProductImg.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      uploadTask.on(
        () => {
          toast.error("images not uploaded!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            await addDoc(docRef, {
              productName: enterTitle,
              shortDesc: enterShortDesc,
              description: enterDescription,
              category: enterCategory,
              price: enterPrice,
              quantity: enterAmount,
              imgUrl: downloadURL,
            });
          });
        }
      );

      setLoading(false);
      toast.success("product successfully added!");
      navigate("/dashboard/all-products");
    } catch (err) {
      setLoading(false);
      toast.error("product not added!");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-5 ">Loading.......</h4>
            ) : (
              <>
                <h4 className="mb-5">Add Product</h4>
                <Form onSubmit={addProduct} style={{ color: "purple" }}>
                  <FormGroup className="form__group">
                  <span style={{ color: "purple" }}>Product title</span>
                    <input
                      type="text"
                      placeholder="......"
                      value={enterTitle}
                      onChange={e => setEnterTitle(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                  <span style={{ color: "purple" }}>Short Description</span>
                    <input
                      type="text"
                      placeholder="......"
                      value={enterShortDesc}
                      onChange={e => setEnterShortDesc(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                  <span style={{ color: "purple" }}>How Many Selling</span>
                    <input
                      type="text"
                      placeholder="......"
                      value={enterAmount}
                      onChange={e => setEnterAmount(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                  <span style={{ color: "purple" }}>Description</span>
                    <input
                      type="text"
                      placeholder="......"
                      value={enterDescription}
                      onChange={e => setEnterDescription(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form__group w-50">
                    <span style={{ color: "purple" }}>Price</span>
                      <input
                        type="number"
                        placeholder="$..."
                        value={enterPrice}
                        onChange={e => setEnterPrice(e.target.value)}
                        required
                      />
                    </FormGroup>

                    <FormGroup className="form__group w-50">
                    <span style={{ color: "purple" }}>Category</span>
                      <select
                        className="w-100 p-2"
                        onChange={e => setEnterCategory(e.target.value)}
                      >
                        <option>Select category</option>
                        <option value="accessories">Accessories</option>
                        <option value="electronics">Electronics</option>
                        <option value="books">Books</option>
                        <option value="toys">Toys</option>
                        <option value="handmade">Handmade</option>
                        <option value="bestseller">bestseller</option>
                      </select>
                    </FormGroup>
                  </div>

                  <div>
                    <FormGroup className="form__group ">
                    <span style={{ color: "purple" }}>Product Image</span>
                      <input
                        type="file"
                        onChange={e => setEnterProductImg(e.target.files[0])}
                        required
                      />
                    </FormGroup>
                  </div>

                  <button className="buy__btn " type="submit">
                    Add Product
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
