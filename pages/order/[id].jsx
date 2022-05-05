import styles from "../../styles/Order.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

const Order = ({ order }) => {
  const status = order.status;

  const statusClass = (index) => {
    if (index - status < 1) {
      return styles.done;
    }
    if (index - status === 1) {
      return styles.inProgress;
    }
    if (index - status > 1) {
      return styles.notDone;
    }
  };

  console.log(statusClass(2));
  console.log(order);
  return (
    <>
      <div className={styles.pageTitle}>Your Orders</div>

      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.row}>
            <table className={styles.table}>
              <thead className={styles.rowHeader}>
                <tr>
                  <th className={styles.th}>Order</th>
                  <th className={styles.th}>Date</th>
                  <th className={styles.th}>Payment</th>
                  <th className={styles.th}>Fullfillment Status</th>
                  <th className={styles.th}>Customer</th>
                  <th className={styles.th}>Address</th>
                  <th className={styles.th}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.trs}>
                  <td>
                    <span className={styles.id}>{order._id}</span>
                  </td>
                  <td>
                    <span className={styles.date}>{order.createdAt}</span>
                  </td>
                  <td>
                    <span className={styles.payment}>{order.method === 0 ? <div>Cash</div> : <div>Paypal</div>}</span>
                  </td>
                  <td>
                    <span className={styles.fullfillment}>Fullfilled</span>
                  </td>
                  <td>
                    <span className={styles.name}>{order.customer}</span>
                  </td>
                  <td>
                    <span className={styles.address}>{order.address}</span>
                  </td>
                  <td>
                    <span className={styles.total}>${order.total}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.row} style={{ marginTop: "5rem" }}>
            <table className={styles.table}>
              <tbody>
                <tr className={styles.tr}>
                  <td>
                    <div className={statusClass(0)}>
                      <div className={styles.status}>
                        <div>
                          <Image src="/image/credit-card.png" width={40} height={40} alt=""></Image>
                        </div>
                        <div className={styles.statusTitle}>Payment</div>
                        <div>
                          <Image
                            src="/image/correct.png"
                            width={20}
                            height={20}
                            alt=""
                            className={styles.checkedIcon}
                          ></Image>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={statusClass(1)}>
                      <div className={styles.status}>
                        <div>
                          <Image src="/image/bake.png" width={40} height={40} alt=""></Image>
                        </div>
                        <div className={styles.statusTitle}>Preparing</div>
                        <div>
                          <Image
                            src="/image/correct.png"
                            width={20}
                            height={20}
                            alt=""
                            className={styles.checkedIcon}
                          ></Image>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={statusClass(2)}>
                      <div className={styles.status}>
                        <div>
                          <Image src="/image/food-delivery.png" width={40} height={40} alt=""></Image>
                        </div>
                        <div className={styles.statusTitle}>On the way</div>
                        <div>
                          <Image
                            src="/image/correct.png"
                            width={20}
                            height={20}
                            alt=""
                            className={styles.checkedIcon}
                          ></Image>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={statusClass(2)}>
                      <div className={styles.status}>
                        <div>
                          <Image src="/image/completed-task.png" width={40} height={40} alt=""></Image>
                        </div>
                        <div className={styles.statusTitle}>Delivered</div>
                        <div>
                          <Image
                            src="/image/correct.png"
                            width={20}
                            height={20}
                            alt=""
                            className={styles.checkedIcon}
                          ></Image>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>Cart Total</h2>

            <div className={styles.totalText}>
              <div className={styles.totalTextTitle}>
                Subtotal: <span>$79.90</span>
              </div>
            </div>

            <div className={styles.totalText}>
              <div className={styles.totalTextTitle}>
                Discount: <span>$0.00</span>
              </div>
            </div>

            <div className={styles.totalText}>
              <div className={styles.totalTextTitle}>
                Total: <span>$79.90</span>
              </div>
            </div>

            <button className={styles.button} disabled="disabled">
              Paid
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Fetch data with server side rendering
// params refer to the parameter ID in the browser URL
export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);

  return {
    props: {
      order: res.data,
    },
  };
};

export default Order;
