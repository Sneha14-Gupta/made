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
  } from "@heroui/react";
  
  function SignUp({ setUser, socket }) {
    const onSubmit = (e) => {
      // Prevent default browser page refresh.
      e.preventDefault();
  
      // Get form data as an object.
      const data = Object.fromEntries(new FormData(e.currentTarget));
  
      // Emit this to our server.
      setUser(data);
      socket.emit("new_user", data);
    };
  
    return (
      <div className="flex items-center justify-center  bg-blue-200 min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400">
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="made logo"
              height={40}
              radius="sm"
              src="favicon.ico"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">MADE Room</p>
              <p className="text-small text-default-500">made.phleebs.tech</p>
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
      </div>
    );
  }
  
  export default SignUp;
