<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <div>
    <h2>The Animals</h2>
    <xsl:apply-templates />
  </div>
</xsl:template>

<xsl:template match="dogs">
  <ul>
    <xsl:apply-templates />
  </ul>
</xsl:template>

<xsl:template match="dog">
  <li>
    <h2><xsl:value-of select="name" /></h2>
    <em><xsl:value-of select="breed" /></em>
    <br />
    <h3>More details about <xsl:value-of select="name" /></h3>
    <xsl:apply-templates select="preferences" />
    <hr />
  </li>
</xsl:template>

<xsl:template match="preferences">
  <ul>
    <li><strong>food: </strong> <xsl:value-of select="food" /></li>
    <li><strong>play time: </strong> <xsl:value-of select="playtime" /></li>
  </ul>
</xsl:template>

<xsl:template match="cat">
  <li>
    <em><xsl:value-of select="name" /></em>:
    <strong><xsl:value-of select="breed" /></strong>
    <h3>More details about <xsl:value-of select="name" /></h3>
    <xsl:apply-templates select="preferences" />
    <img src="http://www.placecage.com/c/200/300" />
    <hr />
  </li>
</xsl:template>

</xsl:stylesheet>
