import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { API_DUMMY } from "../utils/base_URL";

function Sidebar() {
  const [informasi, setInformasi] = useState([]);
  const getInformasi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/jenis-informasi/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setInformasi(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  const [regulasi, setRegulasi] = useState([]);
  const getRegulasi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/jenis-regulasi/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRegulasi(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    getInformasi();
    getRegulasi();
  }, []);

  return (
    <div className="app-theme-white body-tabs-shadow fixed-sidebar fixed-header overflow-auto">
      <div
        className="app-sidebar sidebar-shadow"
        style={{ height: "100vh", overflowY: "auto" }}
      >
        <div className="app-header__logo">
          <div className="logo-src"></div>
          <div className="header__pane ml-auto">
            <div>
              <button
                type="button"
                class="hamburger close-sidebar-btn hamburger--elastic"
                data-class="closed-sidebar"
              >
                <span class="hamburger-box">
                  <span class="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="app-header__mobile-menu">
          <div>
            <button
              type="button"
              class="hamburger hamburger--elastic mobile-toggle-nav"
            >
              {/*  */}
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
        <div className="app-header__menu">
          <span>
            <button
              type="button"
              class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
            >
              <span class="btn-icon-wrapper">
                <i class="fa-solid fa-chevron-down"></i>{" "}
              </span>
            </button>
          </span>
        </div>{" "}
        <div className="scrollbar-sidebar">
          <div className="app-sidebar__inner">
            <ul className="vertical-nav-menu">
              <li className="app-sidebar__heading">Menu</li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-berita"
                  class="mm-active"
                >
                  <i class="fa-regular fa-newspaper metismenu-icon"></i> Berita
                </a>
              </li>
              <li>
                <a style={{ textDecoration: "none" }} href="/admin-pengumuman">
                  <i className="fa-solid fa-circle-info  metismenu-icon"></i>{" "}
                  Pengumuman
                </a>
              </li>
              <li>
                <a style={{ textDecoration: "none" }} href="/admin-page-carousel">
                <i class="fas fa-images metismenu-icon"></i>{" "}
                  Carousel
                </a>
              </li>
              <li>
                <a style={{ textDecoration: "none" }} href="/admin-library">
                <i class="fas fa-book metismenu-icon"></i>{" "}
                  ELibrary
                </a>
              </li>
              <li className="app-sidebar__heading">Informasi</li>
              {/* <li>
                <a style={{ textDecoration: "none" }} href="/jenis-informasi">
                  <i className="fa-regular fa-rectangle-list  metismenu-icon"></i>{" "}
                  Jenis Informasi
                </a>
              </li> */}
              <li>
                <a href="#" style={{ textDecoration: "none" }}>
                  <i class="fa-regular fa-paste metismenu-icon"></i> Isi
                  Informasi
                  <i class="fas fa-arrow-circle-down metismenu-state-icon caret-left"></i>
                </a>
                <ul>
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="/admin-serta-merta"
                    >
                      <i className="metismenu-icon"></i>Serta Merta
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="/admin-setiap-saat"
                    >
                      <i className="metismenu-icon"></i>Setiap Saat
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="/admin-berkala-kepemiluan"
                    >
                      <i className="metismenu-icon"></i>Bekala Kepemiluan
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="/admin-berkala-kelembagaan"
                    >
                      <i className="metismenu-icon"></i>Bekala Kelembagaan
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="/admin-dikecualikan"
                    >
                      <i className="metismenu-icon"></i>Di Kecualikan
                    </a>
                  </li>
                  <li>
                    <a style={{ textDecoration: "none" }} href="/admin-kanal">
                      <i className="metismenu-icon"></i>Kanal
                    </a>
                  </li>
                </ul>
              </li>
              {/* <li>
                <a style={{ textDecoration: "none" }} href="#">
                  <i class="fa-solid fa-bullhorn metismenu-icon "></i>
                  Informasi Publik
                  <i class="fas fa-arrow-circle-down metismenu-state-icon caret-left"></i>
                </a>
                <ul>
                  {informasi.map((inf) => {
                    return (
                      <li key={inf.id}>
                        <a
                          style={{ textDecoration: "none" }}
                          href={`./admin-informasi/${inf.namaInformasi}/${inf.id}`}
                        >
                          <i class="fas fa-arrow-circle-down metismenu-icon"></i>
                          {inf.namaInformasi}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li> */}
              {/* MENU REGULASI */}
              <li class="app-sidebar__heading">Regulasi</li>
              <li>
                <a style={{ textDecoration: "none" }} href="/regulasi-admin">
                  <i className="fa-regular fa-rectangle-list  metismenu-icon"></i>{" "}
                  Regulasi
                </a>
              </li>
              <li>
                <a style={{ textDecoration: "none" }} href="/dip-admin">
                  <i className="fa-regular fa-rectangle-list  metismenu-icon"></i>
                  DIP{" "}
                </a>
              </li>
              <li>
                <a style={{ textDecoration: "none" }} href="/sop-admin">
                  <i className="fa-regular fa-rectangle-list  metismenu-icon"></i>{" "}
                  SOP
                </a>
              </li>
              {/* END MENU REGULASI */}

              <li class="app-sidebar__heading">Permohonan</li>
              <li>
                {/*  */}
                <a
                  style={{ textDecoration: "none" }}
                  href="/adminn-permohonan-informasi"
                >
                  <i class="fa-solid fa-circle-question  metismenu-icon"></i>{" "}
                  Permohonan Informasi
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-permohonan-keberatan"
                >
                  <i class="fa-solid fa-weight-hanging metismenu-icon "></i>{" "}
                  Permohonan Keberatan
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
