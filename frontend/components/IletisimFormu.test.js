import React from "react";

import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import IletisimFormu from "./IletisimFormu";
import {
  findByLabelText,
  findByTestId,
  fireEvent,
  getByAltText,
  getByTestId,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
test("hata olmadan render ediliyor", () => {
  render(<IletisimFormu />);
});

test("iletişim formu headerı render ediliyor", () => {
  render(<IletisimFormu />);
  const title = screen.getByTestId("header");
  expect(title).toBeTruthy(); //
  expect(title).toHaveTextContent(/İletişim Formu/i);
});

test("kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.", async () => {
  render(<IletisimFormu />);
  const isim = await screen.findByTestId("name");
  fireEvent.change(isim, {
    target: { value: "ce" },
  });
  await waitFor(() => {
    expect(isim.value).toBe("ce");
  });

  //screen.debug();
  expect(screen.getByTestId("error")).toHaveTextContent(
    /Hata: ad en az 5 karakter olmalıdır./i
  );
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const clickButton = await screen.findByTestId("button");
  fireEvent.click(clickButton);
  //screen.debug();
  expect(
    screen.getAllByText(
      /Hata: ad en az 5 karakter olmalıdır./i,
      /Hata: soyad gereklidir./i,
      /Hata: email geçerli bir email adresi olmalıdır./i
    )
  );
});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const isim = await screen.findByTestId("name");
  userEvent.type(isim, "Ceylin");
  const soyad = await screen.findByTestId("surname");
  userEvent.type(soyad, "Yaşar");
  const clickButton = await screen.findByTestId("button");
  fireEvent.click(clickButton);
  expect(screen.getByText(/Hata: email geçerli bir email adresi olmalıdır./i));
});

// test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {});

// test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {});

// test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {});

// test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {});
