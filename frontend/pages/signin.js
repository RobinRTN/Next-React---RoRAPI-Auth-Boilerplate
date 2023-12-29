import SignInForm from "@/components/SignInForm";

export default function SignIn() {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center align-center flex-1 max-w-custom mt-2">
          <h2 className="mb-3 heavy text-center">Bienvenue !</h2>
          <SignInForm />
        </div>
      </div>
    </>
  )
}
