import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import SvgIcon from "@mui/material/SvgIcon";
import VerifiedIcon from '@mui/icons-material/Verified';
import HomeSmileIcon from "src/icons/untitled-ui/duocolor/home-smile";
import Users03Icon from "src/icons/untitled-ui/duocolor/users-03";
import { tokens } from "src/locales/tokens";
import { paths } from "src/paths";
import {CategoryOutlined, Inventory, Settings} from "@mui/icons-material";
import Cookies from "js-cookie";

export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    let role = Cookies.get("role")
    if(role !== `VENDOR`) {
      return [
        {
          subheader: "Admin Panel",

          items: [
            {
              title: t(tokens.nav.dashboard),
              path: paths.dashboard.index,
              icon: (
                  <SvgIcon fontSize="small">
                    <HomeSmileIcon/>
                  </SvgIcon>
              ),
            },

            {
              title: t(tokens.nav.userManagement),
              path: paths.userManagement.index,
              icon: (
                  <SvgIcon fontSize="small">
                    <Users03Icon/>
                  </SvgIcon>
              ),
              items: [
                {
                  title: t(tokens.nav.employees),
                  path: paths.userManagement.employees.index,
                  icon: (
                      <SvgIcon fontSize="small">
                        <Users03Icon/>
                      </SvgIcon>
                  ),
                },
                {
                  title: t(tokens.nav.customers),
                  path: paths.userManagement.customers.index,
                  icon: (
                      <SvgIcon fontSize="small">
                        <Users03Icon/>
                      </SvgIcon>
                  ),
                },
                {
                  title: t(tokens.nav.vendors),
                  path: paths.userManagement.vendors.index,
                  icon: (
                      <SvgIcon fontSize="small">
                        <Users03Icon/>
                      </SvgIcon>
                  ),
                },
              ],
            },
            {
              title: t(tokens.nav.eventCategory),
              path: paths.eventCategory.index,
              icon: (
                  <SvgIcon fontSize="small">
                    <CategoryOutlined/>
                  </SvgIcon>
              ),
            },

            {
              title: t(tokens.nav.productManagement),
              path: paths.productManagement.index,
              icon: (
                  <SvgIcon fontSize="small">
                    <Inventory/>
                  </SvgIcon>
              ),
              items: [
                {
                  title: t(tokens.nav.category),
                  path: paths.productManagement.category.index,
                },
                {
                  title: t(tokens.nav.subCategory),
                  path: paths.productManagement.subCategory.index,
                },
                {
                  title: t(tokens.nav.products),
                  path: paths.productManagement.products.index,
                },
              ],
            },
            {
              title: t(tokens.nav.kycVerification),
              path: paths.kycVerification.index,
              icon: (
                  <SvgIcon fontSize="small">
                    <VerifiedIcon/>
                  </SvgIcon>
              ),
              items: [
                {
                  title: t(tokens.nav.businessCustomer),
                  path: paths.kycVerification.businessCustomer.index,
                  icon: (
                      <SvgIcon fontSize="small">
                        <VerifiedIcon/>
                      </SvgIcon>
                  ),
                },
                {
                  title: t(tokens.nav.vendor),
                  path: paths.kycVerification.vendor.index,
                  icon: (
                      <SvgIcon fontSize="small">
                        <VerifiedIcon/>
                      </SvgIcon>
                  ),
                },

              ],
            },
            {
              title: t(tokens.nav.setup),
              path: paths.setup.index,
              icon: (
                  <SvgIcon fontSize="small">
                    <Settings/>
                  </SvgIcon>
              ),
              items: [
                {
                  title: t(tokens.nav.hsn),
                  path: paths.setup.hsn.index,
                  icon: (
                      <SvgIcon fontSize="small">
                        <Settings/>
                      </SvgIcon>
                  ),
                },
                {
                  title: t(tokens.nav.sac),
                  path: paths.setup.sac.index,
                  icon: (
                      <SvgIcon fontSize="small">
                        <Settings/>
                      </SvgIcon>
                  ),
                },

              ],
            },
          ],
        },
      ];
    }
    else {
      return [
        {
          subheader: "Vendor Panel",
          items: [
            {
              title: t(tokens.nav.productManagement),
              path: paths.productManagement.index,
              icon: (
                  <SvgIcon fontSize="small">
                    <Inventory/>
                  </SvgIcon>
              ),
              items: [

                {
                  title: t(tokens.nav.products),
                  path: paths.productManagement.products.index,
                },
              ],
            }
          ]
        }
      ]
    }
  }, [t]);
};
