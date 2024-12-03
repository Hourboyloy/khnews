"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useGlobalContext } from "../context/GlobalContext";

export default function AuthForm({ closeModal }) {
  const { handleSetLogin } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [formMode, setFormMode] = useState("login");
  const router = useRouter();
  const formRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = "https://api-school-amber.vercel.app/register";
    const payload = { username, email, password };

    try {
      const response = await axios.post(url, payload);

      if (response.status === 201) {
        setLoading(false);
        toast({
          title: "ចុះឈ្មោះជោគជ័យ",
          description: "អ្នកបានបង្កើតគណនីថ្មីដោយជោគជ័យ",
          variant: "default",
        });

        setTimeout(() => {
          const userConfirmed = window.confirm(
            "អ្នកបានបង្កើតគណនីដោយជោគជ័យ។ តើអ្នកចង់ចូលគណនីឥឡូវនេះ?"
          );
          if (userConfirmed) {
            setFormMode("login");
          }
        }, 300);

        // closeModal();
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      // handleError(error);
      setLoading(false);
      setTimeout(() => {
        alert("ការចុះឈ្មោះបរាជ័យ។ សូមព្យាយាមម្តងទៀត។");
      }, 300);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = "https://api-school-amber.vercel.app/login";
    const payload = { email, password };

    try {
      const response = await axios.post(url, payload);

      if (response.status === 200) {
        toast({
          title: "ចូលគណនីជោគជ័យ",
          description: "អ្នកបានចូលគណនីដោយជោគជ័យ",
          variant: "default",
        });
        if (response.data.message == "Login successful") {
          handleSetLogin();
          setLoading(false);
          setTimeout(() => {
            alert("អ្នកបានចូលគណនីដោយជោគជ័យ");
          }, 300);
          localStorage.setItem("isLogin", 1);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          if (response.data.user_access_token) {
            console.log("response.data.user_access_token");
            localStorage.setItem(
              "user_access_token",
              response.data.user_access_token
            );
          } else if (response.data.admin_access_token) {
            console.log("response.data.admin_access_token");
            localStorage.setItem(
              "admin_access_token",
              response.data.admin_access_token
            );
          }
        }
        router.push("/");
        closeModal();
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      // handleError(error);
      setLoading(false);
      setTimeout(() => {
        alert("ចូលគណនីមិនជោគជ័យ");
      }, 300);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    console.error(
      "Error during operation:",
      error.response ? error.response.data : error.message
    );
    toast({
      title: "មានបញ្ហា",
      description: error.response
        ? error.response.data.message || "សូមព្យាយាមម្តងទៀត"
        : "សូមព្យាយាមម្តងទៀត",
      variant: "destructive",
    });
  };

  return (
    <div
      ref={formRef}
      className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-200 mx-auto"
    >
      <h3 className="text-3xl text-center mb-6 text-primary bayon">
        {formMode === "register" ? "បង្កើតគណនី" : "ចូលគណនី"}
      </h3>
      <form
        onSubmit={formMode === "register" ? handleRegister : handleLogin}
        className="space-y-4"
      >
        {formMode === "register" && (
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-label="Username"
            />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">អ៊ីមែល</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">ពាក្យសម្ងាត់</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              កំពុងដំណើរការ...
            </>
          ) : formMode === "register" ? (
            "ចុះឈ្មោះ"
          ) : (
            "ចូល"
          )}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">
        {formMode === "register" ? (
          <>
            មានគណនីរួចហើយ?{" "}
            <Button
              variant="link"
              onClick={() => setFormMode("login")}
              className="p-0 h-auto font-normal"
            >
              ចូល
            </Button>
          </>
        ) : (
          <>
            មិនមានគណនី?{" "}
            <Button
              variant="link"
              onClick={() => setFormMode("register")}
              className="p-0 h-auto font-normal"
            >
              ចុះឈ្មោះ
            </Button>
          </>
        )}
      </p>
    </div>
  );
}
