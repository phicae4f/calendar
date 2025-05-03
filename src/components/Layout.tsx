import { Layout, Row } from "antd";
import { ReactNode } from "react";

interface LayoutComponentProps {
  children: ReactNode;
}

export const LayoutComponent= ({ children }: LayoutComponentProps) => {
  return (
    <>
      <Layout.Header>
        <Row justify="end">sdaf</Row>
      </Layout.Header>
      <Layout.Content>{children}</Layout.Content>
      <Layout.Footer>Footer</Layout.Footer>
    </>
  );
};
