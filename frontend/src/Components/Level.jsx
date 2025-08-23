import { useState } from "react";
import * as React from "react";

//

function Structure({ children }) {
	const [note, setNote] = useState(null);
	const [myRow, setThisRow] = useState(0);
	const letMeSee = () => {
		setNote(Number(myRow));
	};
	return (
		<div className="structure">
			<p style={{ direction: "rtl" }}>
				يمكنك حسابك معدلك هنا، إحرص على ملئ الجدول اسفله واضغط على زر
				الحساب لترى نتيجتك !
			</p>
			<table>
				<thead>
					<tr>
						<th>نقطة الأنشطة</th>
						<th>النقطة 4</th>
						<th>النقطة 3</th>
						<th>النقطة 2</th>
						<th>النقطة 1</th>
						<th>المادة</th>
					</tr>
				</thead>
				<tbody>
					{React.Children.map(children, child =>
						React.cloneElement(child, {
							...child.props,
							myRow,
							setThisRow
						})
					)}
				</tbody>
			</table>
			<p className="result">{note}</p>
			<button className="calculButton" onClick={letMeSee}>
				أحسب !
			</button>
		</div>
	);
}

function Trs({ matier, ceof, myRow, setThisRow }) {
	let level = {
		matier,
		ceof: Number(ceof),
		start_values: ["", "", "", "", ""]
	};
	const [values, setValues] = useState(level.start_values);
	function handleChange(i, e) {
		let Cp_value = [...values];
		Cp_value[i] = e.target.value;
		setValues(Cp_value);
		setThisRow(myRow + Calcul_row(Cp_value));
	}
	function Calcul_row(val) {
		if (!val) {
			return 0;
		}
		let total_row = 0;
		let nots = 0;
		for (let i = 0; i < val.length; i++) {
			if (val[i] === "") continue;
			total_row += Number(val[i]);
			nots++;
		}
		let avg = (total_row / nots) * level.ceof;
		if (nots === 0 || avg === 0 || avg === undefined) {
			return 0;
		}
		return avg;
	}
	return (
		<>
			<tr>
				<td>
					<input
						type="number"
						value={values[0]}
						onChange={e => {
							handleChange(0, e);
						}}
					/>
				</td>
				<td>
					<input
						type="number"
						value={values[1]}
						onChange={e => {
							handleChange(1, e);
						}}
					/>
				</td>
				<td>
					<input
						type="number"
						value={values[2]}
						onChange={e => {
							handleChange(2, e);
						}}
					/>
				</td>
				<td>
					<input
						type="number"
						value={values[3]}
						onChange={e => {
							handleChange(3, e);
						}}
					/>
				</td>
				<td>
					<input
						type="number"
						value={values[4]}
						onChange={e => {
							handleChange(4, e);
						}}
					/>
				</td>
				<td className="matier">{matier}</td>
			</tr>
		</>
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
function TCSF() {
	return (
		<>
			<h2 style={{ fontWeight: "600" }}>جذع مشترك علمي</h2>
			<Structure ClassName="structure">
				<Trs ceof="1" matier="الرياضيات" />
				<Trs ceof="1" matier="الفيزياء" />
				<Trs ceof="1" matier="العلوم" />
				<Trs ceof="1" matier="الفرنسية" />
				<Trs ceof="1" matier="العربية" />
				<Trs ceof="1" matier="الانجليزية" />
				<Trs ceof="1" matier="الإسلاميات" />
				<Trs ceof="1" matier="الفلسفة" />
				<Trs ceof="1" matier="معلوميات" />
				<Trs ceof="1" matier="الرياضة" />
				<Trs ceof="1" matier="المواضبة" />
			</Structure>
		</>
	);
}
function TCAL() {
	return (
		<>
			<h2 style={{ fontWeight: "600" }}>جذع مشترك علمي</h2>
			<Structure ClassName="structure">
				<Trs ceof="1" matier="العربية" />
				<Trs ceof="1" matier="الإنجليزية" />
				<Trs ceof="1" matier="الإجتماعيات" />
				<Trs ceof="1" matier="الفلسفة" />
				<Trs ceof="1" matier="الفرنسية" />
				<Trs ceof="1" matier="الرياضيات" />
				<Trs ceof="1" matier="إسلاميات" />
				<Trs ceof="1" matier="العلوم" />
				<Trs ceof="1" matier="الرياضة" />
				<Trs ceof="1" matier="المواضبة" />
			</Structure>
		</>
	);
}
function ABAC_SCEXP() {
	return <></>;
}
function ABAC_LSH() {
	return <></>;
}
function BBAC_SP() {
	return <></>;
}
function BBAC_SH() {
	return <></>;
}

export { TCSF, TCAL, ABAC_LSH, ABAC_SCEXP, BBAC_SH, BBAC_SP };

/*
function Structure({ children }) {
	const [data, setData] = useState({}); // { "رياضيات": {coef: 5, values: [12, 14, ...]} }

	const handleRowChange = (matier, coef, values) => {
		setData(prev => ({
			...prev,
			[matier]: { coef, values }
		}));
	};

	const calculate = () => {
		let total = 0;
		let coefSum = 0;

		Object.values(data).forEach(({ coef, values }) => {
			const nums = values.filter(v => v !== "").map(Number);
			if (nums.length > 0) {
				const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
				total += avg * coef;
				coefSum += coef;
			}
		});

		return coefSum > 0 ? (total / coefSum).toFixed(2) : 0;
	};

	return (
		<div className="structure">
			<table>
				<thead>
					<tr>
						<th>نقطة الأنشطة</th>
						<th>النقطة 4</th>
						<th>النقطة 3</th>
						<th>النقطة 2</th>
						<th>النقطة 1</th>
						<th>المادة</th>
					</tr>
				</thead>
				<tbody>
					{React.Children.map(children, child =>
						React.cloneElement(child, { onChange: handleRowChange })
					)}
				</tbody>
			</table>
			<p className="result">معدلك هو </p>
			<button className="calculButton" onClick={_ => {
			  alert(calculate())
			  
			  
			}}>أحسب !</button>
		</div>
	);
}

function Trs({ matier, coef, onChange }) {
	const [values, setValues] = useState(["", "", "", "", ""]);

	const handleChange = (i, val) => {
		const newValues = [...values];
		newValues[i] = val;
		setValues(newValues);
		onChange(matier, coef, newValues);
	};

	return (
		<tr>
			{values.map((v, i) => (
				<td key={i}>
					<input
						type="number"
						min="0"
						max="20"
						value={v}
						onChange={e => handleChange(i, e.target.value)}
					/>
				</td>
			))}
			<td className="matier">{matier}</td>
		</tr>
	);
}
*/
