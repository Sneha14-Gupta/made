import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Form,
  Input,
  Button,
  Spinner,
} from "@heroui/react";

function SignUp({ setUser, socket }) {
  const [isLoading, setisLoading] = useState(true);

  // Check from session storage
  useEffect(() => {
    setisLoading(false);
    const session = sessionStorage.getItem("user");
    if (session) {
      setUser(session);
    }
  }, []);

  const onSubmit = (e) => {
    // Prevent default browser page refresh.
    e.preventDefault();

    // Get form data as an object.
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Set into session
    sessionStorage.setItem("user", data.name);

    // Emit to the server
    socket.emit("user", data.name);

    // Update parent's state
    setUser(data.name);
  };

  return (
    <div className="flex items-center justify-center  bg-blue-200 min-h-screen">
      {isLoading ? (
        <Spinner />
      ) : (
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="logo"
              height={40}
              radius="sm"
              src="./chat.png"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">MADE Room</p>
            </div>
          </CardHeader>

          <Divider />

          <CardBody>
            <Form onSubmit={onSubmit} validationBehavior="native">
              <Input
                isRequired
                errorMessage="Please enter a valid name"
                label="Name"
                labelPlacement="outside"
                name="name"
                placeholder="Enter your name"
                type="text"
                autoComplete="off"
              />
              <Button type="submit">Enter</Button>
            </Form>
          </CardBody>

          <Divider />

          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/Sneha14-Gupta/made"
            >
              Visit source code on GitHub.
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default SignUp;