<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <h2>The Animals</h2>
  <xsl:apply-templates />
</xsl:template>

<xsl:template match="dogs">
  <ul>
    <xsl:apply-templates />
  </ul>
</xsl:template>

<xsl:template match="dog">
  <li>
    <strong><xsl:value-of select="name" /></strong>:
    <em><xsl:value-of select="breed" /></em>
  </li>
</xsl:template>

<xsl:template match="cat">
  <li>
    <em><xsl:value-of select="name" /></em>:
    <strong><xsl:value-of select="breed" /></strong>
  </li>
</xsl:template>

</xsl:stylesheet>
