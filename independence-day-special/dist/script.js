const tl = new TimelineMax();
tl.add("intro");
tl.set("#Text *", {
	fill: "none"
});
tl.to(
	"#Plane,#MapClippath",
	3,
	{
		y: -200,
		x: 200
	},
	"intro"
);
tl.to(
	"#MapClippath",
	10,
	{
		scale: 4,
		transformOrigin: "center"
	},
	"intro+=1.8"
);
tl.to(
	"#Plane",
	18,
	{
		x: 800,
		y: -800
	},
	"intro+=1.8"
);
tl.from(
	"#largest",
	2,
	{
		x: 200,
		y: -200
	},
	"intro+=12.5"
);
tl.from(
	"#small",
	2,
	{
		x: 200,
		y: -200
	},
	"intro+=13.5"
);
tl.from(
	"#smallest",
	2,
	{
		x: -200,
		y: 200
	},
	"intro+=12.5"
);

tl.from(
	"#large",
	2,
	{
		x: -200,
		y: 200
	},
	"intro+=13.5"
);
tl.fromTo(
	"#Text *",
	3,
	{
		drawSVG: 0
	},
	{
		drawSVG: "100%"
	},
	"intro+=14"
);
tl.to(
	"#Text *",
	2,
	{
		fill: "#db6e1b"
	},
	"intro+=16"
);