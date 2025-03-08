import { useCheckOtp } from "../../services/mutations";
import { setCookie } from "../../utils/cookie";
import {useNavigate} from "react-router-dom";

/* eslint-disable react/prop-types */
const CheckOtpForm = ({ mobile, setStep, setCode, code }) => {
  const { mutate, isPending } = useCheckOtp();
  const navigate = useNavigate()
  const submitHandler = (event) => {
    event.preventDefault();
    if (isPending) return;
    mutate(
      { mobile, code },
      {
        onSuccess: (response) => {
      
          setCookie(response.data);
          navigate("/")
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
    console.log({ code, mobile });
  };

  return (
    <form onSubmit={submitHandler}>
      <p>تایید کد اس ام اس شده</p>
      <span>کد پیامک شده به شماره {mobile} را وارد کنید</span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="کد تایید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button onClick={() => setStep(1)}>تغییر شماره موبایل</button>
    </form>
  );
};

export default CheckOtpForm;
