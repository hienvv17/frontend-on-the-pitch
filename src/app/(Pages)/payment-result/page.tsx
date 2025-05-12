"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { publicApi } from "@/api/base";

const PaymentDonePage = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<null | "success" | "fail">(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apptransid = searchParams.get("apptransid");
    const paymentStatus = searchParams.get("status");

    if (!apptransid || !paymentStatus) {
      setStatus("fail");
      setLoading(false);
      return;
    }

    const checkStatus = async () => {
      try {
        const configApi = publicApi("");
        const response = await configApi.get("/payment/check-status", {
          params: {
            appTransId: apptransid,
            status: paymentStatus,
          },
        });

        if (paymentStatus === "1") {
          setStatus("success");
        } else {
          setStatus("fail");
        }
      } catch (error) {
        console.error("Check payment status failed:", error);
        setStatus("fail");
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [searchParams]);

  if (loading) return <p>Đang kiểm tra trạng thái thanh toán...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      {status === "success" ? (
        <h2 style={{ color: "green" }}>🎉 Thanh toán thành công!</h2>
      ) : (
        <h2 style={{ color: "red" }}>❌ Thanh toán thất bại!</h2>
      )}
    </div>
  );
};

export default PaymentDonePage;
