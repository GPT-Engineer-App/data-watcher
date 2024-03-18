import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Stack, useToast } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-fqfl.fly.dev/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle storage of the access token as needed, perhaps in context, local storage, etc.
        console.log("Logged in:", data);
        toast({ title: "Logged in successfully!", status: "success" });
      } else {
        const error = await response.json();
        toast({ title: "Login failed", description: error.error, status: "error" });
      }
    } catch (error) {
      toast({ title: "Network error", description: error.message, status: "error" });
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("https://backengine-fqfl.fly.dev/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast({ title: "Signed up successfully!", status: "success" });
      } else {
        const error = await response.json();
        toast({ title: "Signup failed", description: error.error, status: "error" });
      }
    } catch (error) {
      toast({ title: "Network error", description: error.message, status: "error" });
    }
  };

  return (
    <Container centerContent>
      <Box p={6} boxShadow="md" borderRadius="md">
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} colorScheme="blue" onClick={handleLogin}>
            Login
          </Button>
          <Button colorScheme="teal" variant="outline" onClick={handleSignup}>
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Index;
