"use client";

import { type ReactElement } from "react";
import { type LoadoutConfig } from "@/lib/settings";
import { ConfigManager } from "@/hooks/useLoadoutConfigs";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import { LucideChevronDown, LucideSettings2 } from "lucide-react";
import { twMerge } from "tailwind-merge";
import StyledButton, { buttonStyles } from "@/components/StyledButton";

export interface ConfigSelectProps {
  className?: string;
  configs: LoadoutConfig[] | undefined;
  configManager: ConfigManager;
}

export default function ConfigSelect({
  className,
  configs,
  configManager,
}: ConfigSelectProps): ReactElement {
  return (
    <>
      <div className={twMerge("flex w-full gap-2", className)}>
        {configs !== undefined && configs.length >= 1 ? (
          <div className="flex-grow">
            <Select
              autoComplete="on"
              selectedKey={configs[0].id}
              onSelectionChange={async (selected) => {
                if (typeof selected !== "number")
                  throw new Error("Invalid key.");
                await configManager.selectConfig(selected);
              }}
              className="flex items-baseline gap-2"
            >
              <Label>Config</Label>
              <StyledButton
                size="lessPadding"
                case="normal"
                className="flex-grow"
              >
                <SelectValue className="grow overflow-ellipsis whitespace-nowrap text-left" />
                <LucideChevronDown size={16} />
              </StyledButton>
              <Popover className="flex min-w-[--trigger-width] flex-col gap-2 bg-gradient-to-b from-black/90 from-50% via-black/80 via-90% to-black/25 p-2">
                <ListBox items={configs}>
                  {(item) => (
                    <ListBoxItem
                      key={item.id}
                      className={twMerge(
                        buttonStyles({
                          size: "lessPadding",
                          case: "normal",
                        }),
                        "w-full justify-start focus:border-main focus:bg-overlay",
                      )}
                    >
                      {item.name}
                    </ListBoxItem>
                  )}
                </ListBox>
              </Popover>
            </Select>
          </div>
        ) : (
          <div
            className={twMerge(
              "flex flex-grow items-baseline gap-2 [&>*]:cursor-wait",
              className,
            )}
          >
            <span>Config</span>
            <Button
              isDisabled
              className="inline-flex h-10 grow items-center gap-2 border border-main-light px-2 text-white/75"
            >
              <span className="grow overflow-ellipsis whitespace-nowrap text-left">
                Loading&hellip;
              </span>
              <LucideChevronDown size={16} />
            </Button>
          </div>
        )}

        {/* Manage Configs */}
        <StyledButton
          isDisabled={configs === undefined || configs.length === 0}
          size="icon"
        >
          <LucideSettings2 size={20} />
        </StyledButton>
      </div>
    </>
  );
}
