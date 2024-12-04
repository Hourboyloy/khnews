"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useGlobalContext } from "../context/GlobalContext";

export default function AuthForm({ closeModal }) {
  const { handleSetLogin } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
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

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    const lowerCaseValue = value.toLowerCase();
    if (/\s/.test(value)) {
      toast({
        title: "Username មិនត្រឹមត្រូវ",
        description: "Username មិនអាចមានចន្លោះ",
        variant: "destructive",
      });
      return;
    }
    setUsername(lowerCaseValue);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (!value.includes("@gmail.com")) {
      toast({
        title: "អ៊ីមែលមិនត្រឹមត្រូវ",
        description: "សូមបញ្ចូលអ៊ីមែលដែលបញ្ចប់ដោយ @gmail.com",
        variant: "destructive",
      });
    }
    setEmail(value);
  };

  const handleEmailBlur = () => {
    if (email && !email.endsWith("@gmail.com")) {
      const suggestedEmail = email.includes("@")
        ? email.split("@")[0] + "@gmail.com"
        : email + "@gmail.com";

      setEmail(suggestedEmail);
      toast({
        title: "អ៊ីមែលត្រូវបានផ្ដល់អនុសាសន៍",
        description: `យើងបានផ្ដល់អនុសាសន៍: ${suggestedEmail}`,
        variant: "default",
      });
    }
  };

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
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      setLoading(false);
      alert("ការចុះឈ្មោះបរាជ័យ។ សូមព្យាយាមម្តងទៀត។");
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
        if (response.data.message === "Login successful") {
          handleSetLogin(
            response.data.user,
            response.data.user_access_token
              ? response.data.user_access_token
              : response.data.admin_access_token
          );
          localStorage.setItem("isLogin", 1);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          if (response.data.user_access_token) {
            localStorage.setItem(
              "user_access_token",
              response.data.user_access_token
            );
          } else if (response.data.admin_access_token) {
            localStorage.setItem(
              "admin_access_token",
              response.data.admin_access_token
            );
          }
          // router.push("/");
          closeModal();
        } else {
          throw new Error(
            `Unexpected response message: ${response.data.message}`
          );
        }
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      setLoading(false);
      alert("ចូលគណនីមិនជោគជ័យ");
    } finally {
      setLoading(false);
    }
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
        className="space-y-4 focus:outline-none outline-none"
      >
        {formMode === "register" && (
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="បញ្ចូល Username"
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
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            placeholder="បញ្ចូលអ៊ីមែល (@gmail.com)"
            required
            aria-label="Email"
          />
        </div>
        <div className="space-y-2 relative">
          <Label htmlFor="password">ពាក្យសម្ងាត់</Label>
          <Input
            type={passwordVisible ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="បញ្ចូលពាក្យសម្ងាត់"
            required
            aria-label="Password"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none outline-none"
          >
            {passwordVisible ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full focus:outline-none outline-none"
        >
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
              className="p-0 h-auto font-normal focus:outline-none outline-none select-none"
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
              className="p-0 h-auto font-normal focus:outline-none outline-none"
            >
              ចុះឈ្មោះ
            </Button>
          </>
        )}
      </p>
    </div>
  );
}
