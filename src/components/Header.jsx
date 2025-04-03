import { useState } from "react";
import "./Header.css";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function Header() {
	const [isDisplayed, setIsDisplayed] = useState(false);

	function handleMenuClick() {
		setIsDisplayed((prevIsDisplayed) => !prevIsDisplayed);
	}

	let dropdownMenuClasses = "custom-dropdown-menu";
	if (isDisplayed) {
		dropdownMenuClasses += " display-mobile-menu";
	}

	return (
		<header className="Header">
			<nav className="nav bg-primary w-100">
				<Container className="d-flex justify-content-between align-items-center">
					<Link to="/" className="p-3">
						<img
							src="https://itschool.ro/images/logo-itschool-dark.svg"
							alt="itschool logo"
						/>
					</Link>
					<div className="menu-icon-container">
						<span
							onClick={handleMenuClick}
							className="material-icons menu-icon text-light"
						>
							{" "}
							menu{" "}
						</span>
						<ul className={dropdownMenuClasses}>
							<li className={isDisplayed ? "container" : null}>
								<Link
									to="/category/technology"
									className="p-3 text-uppercase text-light"
								>
									Tech
								</Link>
							</li>
							<li className={isDisplayed ? "container" : null}>
								<Link
									to="/category/football"
									className="p-3 text-uppercase text-light"
								>
									Fotbal
								</Link>
							</li>
							<li className={isDisplayed ? "container" : null}>
								<Link
									to="/category/culture"
									className="p-3 text-uppercase text-light"
								>
									Cultura
								</Link>
							</li>
							<li className={isDisplayed ? "container" : null}>
								<Link
									to="/category/books"
									className="p-3 text-uppercase text-light"
								>
									Books
								</Link>
							</li>
							<li className={isDisplayed ? "container" : null}>
								<Link
									to="/category/travel"
									className="p-3 text-uppercase text-light"
								>
									Travel
								</Link>
							</li>
							<li className={isDisplayed ? "container" : null}>
								<Link
									to="/favorites"
									className="p-3 text-uppercase text-light"
								>
									Favorite
								</Link>
							</li>
						</ul>
					</div>
				</Container>
			</nav>
		</header>
	);
}

export default Header;
