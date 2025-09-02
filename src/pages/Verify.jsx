import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Verify() {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/auth/verify/${token}`
        );
        toast.success(res.data.message);
      } catch (err) {
        toast.error(err.response?.data?.message || "Verification failed");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {loading ? (
        <p className="text-lg">⏳ Verifying your email...</p>
      ) : (
        <p className="text-lg">✅ Verification complete. You can login now.</p>
      )}
    </div>
  );
}
