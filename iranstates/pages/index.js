import Head from "next/head";

import irancities from "/data/iran-cities.json";
import tehran from "/data/tehran.json";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";

export default function Home() {
  const [currentcity, setCurrentCity] = useState({ data: tehran });

  useEffect(async () => {
    var current_cities = irancities[6].cities;
    setCurrentCity(current_cities);
  }, []);

  const handleSelectProvinceChange = ({ currentTarget: input }) => {
    var current_cities = [];
    for (let index = 0; index < irancities.length; index++) {
      const element = irancities[index];
      if (element.province == input.value) {
        current_cities = element.cities;
        break;
      }
    }
    setCurrentCity(current_cities);
  };

  return (
    <div className="container">
      <Head>
        <title>Iran provinces and cities select box to form in Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Iran provinces and cities select box to form in Next.js
        </h1>

        <Form>
          <Col>
            <Form.Group className="mb-3" controlId="province-input">
              <Form.Label className="d-block text-muted">
                استان <sup className="text-danger">*</sup>
              </Form.Label>
              <Form.Select
                defaultValue="تهران"
                name="province"
                className="d-block text-muted"
                onChange={(e) => {
                  handleSelectProvinceChange(e);
                }}
              >
                {irancities.map((item, i) => (
                  <option key={i} value={item.province}>
                    {item.province}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="city-input">
              <Form.Label className="d-block text-muted">
                شهر <sup className="text-danger">*</sup>
              </Form.Label>
              <Form.Select
                defaultValue="0"
                name="city"
                className="d-block text-muted"
              >
                {currentcity.length
                  ? currentcity.map((item, i) => (
                      <option key={i} value={item.name}>
                        {item.name}
                      </option>
                    ))
                  : ""}
              </Form.Select>
            </Form.Group>
          </Col>
        </Form>

        <a
          title="View source"
          href="https://github.com/amirshnll/iran-city-province-nextjs"
        >
          <h3>View source</h3>
        </a>
      </main>
    </div>
  );
}
