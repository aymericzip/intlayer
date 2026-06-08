use std::net::TcpStream;
use std::path::PathBuf;
use std::process::{Child, Command};
use std::sync::Mutex;
use std::thread;
use std::time::Duration;
use tauri::Manager;

#[cfg(not(debug_assertions))]
struct ServerProcess(Mutex<Option<Child>>);

impl Drop for ServerProcess {
    fn drop(&mut self) {
        if let Some(mut child) = self.0.lock().unwrap().take() {
            let _ = child.kill();
            let _ = child.wait();
        }
    }
}

#[cfg(not(debug_assertions))]
fn find_node() -> PathBuf {
    for path in &[
        "/opt/homebrew/bin/node",
        "/usr/local/bin/node",
        "/usr/bin/node",
    ] {
        let p = PathBuf::from(path);
        if p.exists() {
            return p;
        }
    }
    PathBuf::from("node")
}

#[cfg(not(debug_assertions))]
fn resource_dir() -> PathBuf {
    let exe = std::env::current_exe().expect("current_exe failed");
    // macOS bundle: .app/Contents/MacOS/<binary> → .app/Contents/Resources/
    exe.parent() // MacOS/
        .unwrap()
        .parent() // Contents/
        .unwrap()
        .join("Resources")
}

#[cfg(not(debug_assertions))]
fn start_server() -> ServerProcess {
    let res_dir = resource_dir();
    let server_script = res_dir.join("server").join("index.mjs");
    let node = find_node();

    let child = Command::new(node)
        .arg(&server_script)
        .env("PORT", "3000")
        .spawn()
        .expect("failed to start node server");

    // Block until the server accepts connections (up to 30 s)
    for _ in 0..150 {
        if TcpStream::connect("127.0.0.1:3000").is_ok() {
            break;
        }
        thread::sleep(Duration::from_millis(200));
    }

    ServerProcess(Mutex::new(Some(child)))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // In release, start and wait for the Nitro server before Tauri creates the
    // webview — so http://localhost:3000 is already reachable on first load.
    #[cfg(not(debug_assertions))]
    let _server = start_server();

    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();

            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
                window.open_devtools();
            }

            window.show()?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    // _server drops here → child.kill() is called
}
