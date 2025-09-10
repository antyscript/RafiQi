import { useState } from "react";
import * as React from "react";
import { Link } from "react-router-dom";
import {
	
	Alert
} from "@mui/material";
// Structure

function Structure({ children }) {
	const [rows, setRows] = useState({});
	const [note, setNote] = useState(null);

	const updateRow = (matier, coef, avg) => {
		setRows(prev => ({
			...prev,
			[matier]: { coef, avg }
		}));
	};

	const letMeSee = () => {
		let numerator = 0;
		let denominator = 0;

		Object.values(rows).forEach(({ coef, avg }) => {
			if (avg !== null) {
				numerator += avg * coef;
				denominator += coef;
			}
		});

		if (denominator === 0) {
			setNote(0);
		} else {
			setNote((numerator / denominator).toFixed(2));
		}
	};

	return (
		<div className="structure">
			<p style={{ direction: "rtl" }}>
				يمكنك حساب معدلك هنا، إحرص على ملئ الجدول أسفله واضغط على زر
				الحساب لترى نتيجتك!
			</p>
			<table>
				<thead>
					<tr>
						<th>الأنشطة</th>
						<th>نقطة 4</th>
						<th>نقطة 3</th>
						<th>نقطة 2</th>
						<th>نقطة 1</th>
						<th>المادة</th>
					</tr>
				</thead>
				<tbody>
					{React.Children.map(children, child =>
						React.cloneElement(child, {
							...child.props,
							updateRow
						})
					)}
				</tbody>
			</table>
			<p
				className="result"
				style={{ color: note < 10.0 ? "red" : "green" }}
			>
				{note}
			</p>
			<button className="calculButton" onClick={letMeSee}>
				أحسب !
			</button>
		</div>
	);
}

// Trs.jsx

function Trs({ matier, ceof, updateRow }) {
	const coef = Number(ceof);
	const [values, setValues] = useState(["", "", "", "", ""]);

	function handleChange(i, e) {
		const newVals = [...values];
		newVals[i] = e.target.value;
		setValues(newVals);

		const nums = newVals
			.map(v => (v === "" ? null : Number(v)))
			.filter(v => v !== null && !isNaN(v));

		let avg = null;
		if (nums.length > 0) {
			avg = nums.reduce((a, b) => a + b, 0) / nums.length;
		}

		updateRow(matier, coef, avg);
	}

	return (
		<tr>
			{values.map((val, i) => (
				<td key={i}>
					<input
						type="number"
						value={val}
						onChange={e => handleChange(i, e)}
					/>
				</td>
			))}
			<td className="matier">{matier}</td>
		</tr>
	);
}

function TrsM({ matier }) {
	return (
		<>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td>
					<input type="number" min="0" max="20" />
				</td>
				<td className="matier">{matier}</td>
			</tr>
		</>
	);
}

function Sndala999({ anneLevel, title, H4 = "المعدل العام" }) {
	const [values, setValues] = useState(Array(anneLevel.length).fill(0));
	console.log(values);
	const [note, setNote] = useState(0);
	function handleChange(i, e) {
		const newVals = [...values];
		newVals[i] = e.target.value;
		setValues(newVals);
	}

	function anne() {
		let numerator = 0;
		let denominator = 0;

		values.forEach((val, i) => {
			const numVal = val === "" || isNaN(Number(val)) ? 0 : Number(val);

			const coef = Number(anneLevel[i].coef);
			if (coef > 0) {
				numerator += numVal * coef;
				denominator += coef;
			}
		});

		if (denominator === 0) {
			setNote(0);
		} else {
			setNote((numerator / denominator).toFixed(2));
		}
	}
	return (
		<>
			<h4 style={{ fontWeight: "600", marginTop: "20px" }}>{H4}</h4>
			<div className="Grand_father">
				<div className="father">
					<div>النقطة</div>
					{anneLevel.map((lev, i) => {
						return (
							<div key={i}>
								<input
									type="number"
									value={values[i]}
									onChange={e => handleChange(i, e)}
									placeholder="القيمة الإفتراضية : 0"
								/>
							</div>
						);
					})}
					<div style={{ color: note < 10.0 ? "red" : "green" }}>
						{note}
					</div>
				</div>

				<div className="father">
					<div>{title}</div>
					{anneLevel.map((lev, i) => {
						return (
							<div
								key={i}
								style={{
									backgroundColor:
										"rgba(156, 163, 175, 0.502)"
								}}
							>
								{lev.subject}
							</div>
						);
					})}
					<div
						onClick={anne}
						style={{ backgroundColor: "rgba(249, 115, 22, 0.794)" }}
					>
						أحسب
					</div>
				</div>
			</div>
		</>
	);
}

function TCSF() {
	let anneLevel = [
		{ subject: "الاولى", coef: 1 },
		{ subject: "الثانية", coef: 1 }
	];
	return (
		<>
			<h2 style={{ fontWeight: "600", marginTop: "20px" }}>
				جذع مشترك علمي
			</h2>
			<Structure ClassName="structure">
				<Trs ceof="4" matier="الرياضيات" />
				<Trs ceof="4" matier="الفيزياء" />
				<Trs ceof="4" matier="العلوم" />
				<Trs ceof="3" matier="الفرنسية" />
				<Trs ceof="3" matier="العربية" />
				<Trs ceof="3" matier="الانجليزية" />
				<Trs ceof="2" matier="الإسلاميات" />
				<Trs ceof="2" matier="الفلسفة" />
				<Trs ceof="2" matier="معلوميات" />
				<Trs ceof="2" matier="الرياضة" />
			</Structure>
			<Sndala999 anneLevel={anneLevel} title="الدورة" />
		</>
	);
}
function TCAL() {
	let anneLevel = [
		{ subject: "الثانية", coef: 1 },
		{ subject: "الاولى", coef: 1 }
	];

	return (
		<>
			<h2 style={{ fontWeight: "600", marginTop: "20px" }}>
				جذع مشترك أداب
			</h2>
			<Structure ClassName="structure">
				<Trs ceof="4" matier="العربية" />
				<Trs ceof="3" matier="الفسلفة" />
				<Trs ceof="3" matier="الفرنسية" />
				<Trs ceof="2" matier="العلوم" />
				<Trs ceof="7" matier="الرياضيات" />
				<Trs ceof="7" matier="الفيزياء" />
				<Trs ceof="2" matier="الإنجليزية" />
				<Trs ceof="1" matier="الإجتماعيات" />
				<Trs ceof="1" matier="إسلاميات" />
				<Trs ceof="1" matier="الرياضة" />
			</Structure>
			<Sndala999 anneLevel={anneLevel} title="الدورة" />
		</>
	);
}
function ABAC_SCEXP() {
	const anneLevel = [
		{ subject: "الدورة الاولى", coef: 1.5 },
		{ subject: "الدورة الثانية", coef: 1.5 },
		{ subject: "الجهوي", coef: 1 }
	];
	const subjects = [
		{ subject: "الفرنسية", coef: 4 },
		{ subject: "العربية", coef: 2 },
		{ subject: "إسلاميات", coef: 2 },
		{ subject: "إجتماعيات", coef: 2 }
	];
	return (
		<>
			<h2 style={{ fontWeight: "600", marginTop: "20px" }}>
				أولى باكالوريا علوم تجريبية
			</h2>
			<Structure ClassName="structure">
				<Trs ceof="7" matier="الرياضيات" />
				<Trs ceof="7" matier="الفيزياء" />
				<Trs ceof="7" matier="العلوم" />
				<Trs ceof="4" matier="الفرنسية" />
				<Trs ceof="2" matier="العربية" />
				<Trs ceof="2" matier="الإنجليزية" />
				<Trs ceof="2" matier="الإجتماعيات" />
				<Trs ceof="2" matier="إسلاميات" />
				<Trs ceof="2" matier="الفسلفة" />
				<Trs ceof="1" matier="الرياضة" />
			</Structure>
			<Sndala999 anneLevel={subjects} H4="المعدل الجهوي" title="المادة" />
			<Sndala999 anneLevel={anneLevel} title="المرحلة" />
		</>
	);
}
function ABAC_LSH() {
	const anneLevel = [
		{ subject: "الدورة الاولى", coef: 1.5 },
		{ subject: "الدورة الثانية", coef: 1.5 },
		{ subject: "الجهوي", coef: 1 }
	];
	const subjects = [
		{ subject: "الفرنسية", coef: 4 },
		{ subject: "إسلاميات", coef: 2 },
		{ subject: "الرياضيات", coef: 1 }
	];

	return (
		<>
			<h2 style={{ fontWeight: "600", marginTop: "20px" }}>
				اولى باكالوريا اداب وعلوم إنسانية
			</h2>
			<Structure ClassName="structure">
				<Trs ceof="4" matier="العربية" />
				<Trs ceof="4" matier="الإنجليزية" />
				<Trs ceof="4" matier="الإجتماعيات" />
				<Trs ceof="4" matier="الفلسفة" />
				<Trs ceof="4" matier="الفرنسية" />
				<Trs ceof="2" matier="إسلاميات" />
				<Trs ceof="1" matier="الرياضيات" />
				<Trs ceof="1" matier="العلوم" />
				<Trs ceof="1" matier="الرياضة" />
			</Structure>
			<Sndala999 anneLevel={subjects} H4="المعدل الجهوي" title="المادة" />
			<Sndala999 anneLevel={anneLevel} title="المرحلة" />
		</>
	);
}
function BBAC_PC() {
	const anneLevel = [
		{ subject: "المراقبة", coef: 1 },
		{ subject: "الجهوي", coef: 1 },
		{ subject: "الوطني", coef: 2 }
	];
	const subjects = [
		{ subject: "الرياضيات", coef: 7 },
		{ subject: "الفيزياء", coef: 7 },
		{ subject: "العلوم", coef: 4 },
		{ subject: "الفلسفة", coef: 3 },
		{ subject: "الفرنسية", coef: 2 },
		{ subject: "العربية", coef: 2 },
		{ subject: "الإنجليزية", coef: 2 }
	];
	return (
		<>
			<h2 style={{ fontWeight: "600", marginTop: "20px" }}>
				الثانية باكالوريا علوم فيزياء
			</h2>
			<Structure ClassName="structure">
				<Trs ceof="7" matier="الرياضيات" />
				<Trs ceof="7" matier="الفيزياء" />
				<Trs ceof="7" matier="العلوم" />
				<Trs ceof="3" matier="الفسلفة" />
				<Trs ceof="2" matier="الفرنسية" />
				<Trs ceof="2" matier="العربية" />
				<Trs ceof="2" matier="الإنجليزية" />
				<Trs ceof="1" matier="الإجتماعيات" />
				<Trs ceof="1" matier="إسلاميات" />
				<Trs ceof="1" matier="الرياضة" />
			</Structure>
			<Sndala999 anneLevel={subjects} H4="المعدل الوطني" title="المادة" />
			<Sndala999 anneLevel={anneLevel} title="المرحلة" />
		</>
	);
}
function BBAC_SH() {
	const anneLevel = [
		{ subject: "المراقبة", coef: 1 },
		{ subject: "الجهوي", coef: 1 },
		{ subject: "الوطني", coef: 2 }
	];
	const subjects = [
		{ subject: "الفسلفة", coef: 4 },
		{ subject: "العربية", coef: 4 },
		{ subject: "الإجتماعيات", coef: 4 },
		{ subject: "الفرنسية", coef: 3 }
	];
	return (
		<>
			<h2 style={{ fontWeight: "600", marginTop: "20px" }}>
				الثانية باكالوريا علوم إنسانية
			</h2>
			<Structure ClassName="structure">
				<Trs ceof="4" matier="العربية" />
				<Trs ceof="4" matier="الفلسفة" />
				<Trs ceof="4" matier="الإجتماعيات" />
				<Trs ceof="2" matier="الفرنسية" />
				<Trs ceof="2" matier="الإنجليزية" />
				<Trs ceof="1" matier="الرياضيات" />
				<Trs ceof="1" matier="العلوم" />
				<Trs ceof="1" matier="إسلاميات" />
				<Trs ceof="1" matier="الرياضة" />
			</Structure>
			<Sndala999 anneLevel={subjects} H4="المعدل الوطني" title="المادة" />
			<Sndala999 anneLevel={anneLevel} title="المرحلة" />
		</>
	);
}

function IsToken({ children }) {
	const token = localStorage.getItem("token");
	if (token) {
		console.log(JSON.stringify(localStorage));
		return (
			<div>
				يبدوا انك لم تسجل الدخول، سجل من هنا اولا:{" "}
				<Link
					to="/signup"
					style={{
						color: "#f97316"
					}}
				>
					تسجيل الدخول
				</Link>
			</div>
		);
	} else {
		return <>{children}</>;
	}
}

export { TCSF, TCAL, ABAC_LSH, ABAC_SCEXP, BBAC_SH, BBAC_PC, IsToken };
