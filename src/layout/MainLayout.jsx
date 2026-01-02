import { Outlet } from "react-router-dom";
export default function MainLayout(){
    return(
        <>
        <header>BigBoss Machines</header>
        <main>
            <Outlet />
        </main>
        <footer>© BigBossMachines</footer>
        </>
    )
}